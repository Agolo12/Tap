import requests
import time
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Configuration
TELEGRAM_BOT_TOKEN = "your_telegram_bot_token_here"  # Replace with your bot token
TAP_API_URL = "https://gold-eagle-api.fly.dev/tap"
PROGRESS_API_URL = "https://gold-eagle-api.fly.dev/user/me/progress"
TAP_COUNT = 600  # Maximum taps per execution
HEADERS = {
    "Authorization": f"Bearer {TELEGRAM_BOT_TOKEN}",
    "Content-Type": "application/json"
}

def tap_bot():
    """Send taps to the Gold Eagle bot."""
    success_count = 0

    for i in range(TAP_COUNT):
        try:
            response = requests.post(TAP_API_URL, headers=HEADERS)
            if response.status_code == 200:
                success_count += 1
            else:
                logging.warning(f"Tap {i + 1} failed! Status: {response.status_code} - {response.text}")
            
            # Respect API rate limits (avoid spam detection)
            time.sleep(0.5)  # Adjust if needed

        except Exception as e:
            logging.error(f"Error on tap {i + 1}: {e}")
            break

    logging.info(f"Completed {success_count}/{TAP_COUNT} taps.")

def check_progress():
    """Fetch and log user progress."""
    try:
        response = requests.get(PROGRESS_API_URL, headers=HEADERS)
        if response.status_code == 200:
            progress_data = response.json()
            logging.info(f"User Progress: {progress_data}")
        else:
            logging.warning(f"Failed to fetch progress! Status: {response.status_code} - {response.text}")

    except Exception as e:
        logging.error(f"Error fetching progress: {e}")

if __name__ == "__main__":
    logging.info("Starting Gold Eagle Bot Tapping...")
    tap_bot()
    check_progress()
    logging.info("Tapping session completed.")
        
