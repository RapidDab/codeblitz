from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
driver = webdriver.Firefox()

driver.get("https://github.com/DreamDevourer/Python-Fundamentals-Study")

elements = WebDriverWait(driver, 10).until(EC.visibility_of_all_elements_located((By.TAG_NAME, "pre")))
elements_string = []
f = open("codetypingtest/words.txt", "a")
for element in elements:
    f.write(element.text)
    print(element.text)
    f.write("\n"+"###"+"\n")
f.close()