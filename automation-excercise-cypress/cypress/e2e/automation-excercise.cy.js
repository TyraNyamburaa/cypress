describe('Verify homepage loads', () => {
  it('Opening home page', () => {
    cy.visit('https://automationexercise.com')
  })
})

describe("Register a new user", () => {
  const password = "dhai%1731";
  const email = `student${Date.now()}@test.com`;

  it("Signing up", () => {
    cy.visit("https://automationexercise.com");

    // Signup credentials
    const name = `Helen Hamsini`;
    const firstName = `Helen`;
    const lastName = `Hamsini`;
    const company = "Makash";

    cy.get('li a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type(name);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    // Account info
    cy.get("#id_gender2").click();
    cy.get('[data-qa="password"]').type(password);
    cy.get('[data-qa="days"]').select("21");
    cy.get('[data-qa="months"]').select("February");
    cy.get('[data-qa="years"]').select("2000");
    cy.get('[data-qa="first_name"]').type(firstName);
    cy.get('[data-qa="last_name"]').type(lastName);
    cy.get('[data-qa="company"]').type(company);
    cy.get('[data-qa="address"]').type("mash.strt.hunter avenue");
    cy.get('[data-qa="address2"]').type("hez.hunter lane");
    cy.get('[data-qa="country"]').select("Israel");
    cy.get('[data-qa="state"]').type("uhamek");
    cy.get('[data-qa="city"]').type("Beirut");
    cy.get('[data-qa="zipcode"]').type("90001");
    cy.get('[data-qa="mobile_number"]').type("1278284723");

    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="continue-button"]').click();

    // cy.get('li a[href="/delete_account"]').click();

    cy.get('li a[href="/logout"]').click();
  });

  // Navigate to login portal screen
  it("Login with valid credentials and logout successfully", () => {
    cy.visit("https://automationexercise.com");

    cy.get('li a[href="/login"]').click();

    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password);
    cy.get('[data-qa="login-button"]').click();

    // Logout successfully
    cy.get('li a[href="/logout"]').click();
  });
});

describe('Unsuccessful login with invalid credentials', () => {
  it("Error message display", () => {
    cy.visit("https://automationexercise.com");

    cy.get('li a[href="/login"]').click();

    cy.get('[data-qa="login-email"]').type('mygmail@gmail.com');
    cy.get('[data-qa="login-password"]').type('mypassword123');
    cy.get('[data-qa="login-button"]').click();
  });
})

describe('Searched product results are related to the product', () => {
  it("Search for a product", () => {
    cy.visit("https://automationexercise.com");

    cy.get('li a[href="/products"]').click();
    cy.get('#search_product').type('dress');
    cy.get('#submit_search').click();
  })
})

describe('Full product details display', () => {
  it("Views product details of the first product", () => {
    cy.visit("https://automationexercise.com");

    cy.get('li a[href="/products"]').click();
    cy.get('li a[href="/product_details/1"]').click();
  })
})

describe('Cart functionality', () => {
  it("adds a product to cart", () => {
    cy.visit("https://automationexercise.com");

    cy.get('li a[href="/products"]').click();
    cy.get('a[data-product-id="1"]').first().click();
    cy.get('a').contains('View Cart').click();
  })
})

describe('Cart functionality', () => {
  it("removes a product from the cart", () => {
    cy.visit("https://automationexercise.com");

    cy.get('li a[href="/products"]').click();
    cy.get('a[data-product-id="1"]').first().click();

    // Navigate into the shopping cart page via the modal pop-up link
    cy.get('a').contains('View Cart').click();

    // Click the delete "X" button inside the cart table layout
    cy.get('a.cart_quantity_delete').click();
  })
})

describe("Contact form", () => {
  it("Successful form submission", () => {
    const name = `Helen Hamsini`;
    const email = `student${Date.now()}@test.com`;

    cy.visit("https://automationexercise.com");

    cy.get('li a[href="/contact_us"]').click();
    cy.get('[data-qa="name"]').type(name);
    cy.get('[data-qa="email"]').type(email);
    cy.get('[data-qa="subject"]').type("My first test");
    cy.get('[data-qa="message"]').type("Have a good one. Thank you");
    cy.get('[data-qa="submit-button"]').click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Press OK");
    });
  });
});
