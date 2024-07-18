from selenium import webdriver
from langdetect import detect
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
driver = webdriver.Chrome()
num =1
url = ""
for i in range(63, 99):
    try:
        url = f"https://gist.github.com/search?p={i}&q=python&ref=searchresults"
        driver.get(url)
        elements = WebDriverWait(driver, 10).until(EC.visibility_of_all_elements_located((By.TAG_NAME, "table")))
        # elements_string = []
        f = open("codetypingtest/words.txt", "a")
        for element in elements:
            if (detect(element.text) == "en"): 
                f.write(element.text)
                print(element.text)
                f.write("\n"+"###"+"\n")
        f.close()
        time.sleep(300)
    except:
        pass