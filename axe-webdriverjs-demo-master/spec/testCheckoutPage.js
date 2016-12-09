var selenium = require('selenium-webdriver'),
    AxeBuilder = require('axe-webdriverjs'),
    Key = selenium.Key;

var util = require('util');

var driver;

describe('Checkout demo', function() {

    beforeEach(function(done) {
        driver = new selenium.Builder()
            .forBrowser('chrome')
            .build();

        driver.get('http://jp-dev.salientcrgt-devops.com/jpetstore/actions/Account.action?signonForm=')
            .then(function () {
                done();
            });
    });

    // Close website after each test is run (so it is opened fresh each time)
    afterEach(function(done) {
        driver.quit().then(function () {
            done();
        });
    });


    it('...should go to the checkout page and analyze it', function (done) {
		driver.findElement(selenium.By.name("signon")).click();
		driver.findElement(selenium.By.css("#SidebarContent > a > img")).click();
		driver.findElement(selenium.By.linkText("FI-FW-01")).click(); 
		driver.findElement(selenium.By.linkText("Add to Cart")).click();
		driver.findElement(selenium.By.linkText("Proceed to Checkout")).click();
		driver.findElement(selenium.By.id("Catalog"))
            .then(function () {
                AxeBuilder(driver)
                    .analyze(function(results) {
                        console.log('Accessibility Violations: ', results.violations.length);
                        if (results.violations.length > 0) {
                            console.log(util.inspect(results.violations, true, null));
                        }
                        expect(results.violations.length).toBe(0);
                        done();
                    })
            });
    });
});