from playwright.sync_api import sync_playwright
import time
import os

def run_cuj(page):
    # Reduced motion simulation
    page.emulate_media(reduced_motion="reduce")
    page.goto("http://localhost:4173")
    page.wait_for_timeout(2000)

    # Hover the project carousel to test pause-on-hover
    carousel = page.locator('.relative.border.border-border-color.bg-surface.shadow-hard').first
    carousel.hover()
    page.wait_for_timeout(3000)

    # Navigate to Projects page
    page.get_by_role("navigation").get_by_role("link", name="Projects").click()
    page.wait_for_timeout(2000)

    # Take screenshot at the key moment
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    os.makedirs("/home/jules/verification/videos", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
