import React from 'react';
import { SKILLS } from '../constants';
import { Code2, Layout, Database, Brain, Cpu, Users } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Layout,
  Database,
  Brain,
  Cpu,
  Users
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative flex h-auto w-full flex-col group/design-root font-display pt-20 pb-10">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            
            <div className="mb-12" data-aos="fade-up">
              <h2 className="font-display italic text-3xl font-medium tracking-tight border-b border-border-color pb-4 inline-block pr-12 text-text-main">Technical Expertise</h2>
            </div>

            <div className="bg-border-color gap-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border-color shadow-hard" data-aos="fade-up" data-aos-delay="100" role="list">
              {SKILLS.map((category, idx) => {
                const Icon = iconMap[category.iconName] || Code2;
                return (
                  <div key={idx} className="bg-surface flex flex-col h-full" role="listitem">
                    <div className="bg-text-main text-surface font-mono text-[13px] uppercase px-4 py-2 flex items-center justify-between">
                      <span>{category.name}</span>
                      <Icon size={16} aria-hidden="true" />
                    </div>
                    <ul className="flex flex-col flex-1 p-0">
                      {category.skills.map((skill, sIdx) => (
                        <li key={sIdx} className="px-5 py-4 border-b border-[#E5E5E5] last:border-0 hover:bg-background-light transition-colors flex justify-between items-baseline">
                          <span className="font-medium font-sans text-text-main">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;