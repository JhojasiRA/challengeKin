package stepdefinitions;

import cucumber.api.java.Before;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import expections.MessageException;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import net.serenitybdd.screenplay.actions.Open;
import net.serenitybdd.screenplay.actors.Cast;
import net.serenitybdd.screenplay.actors.OnStage;
import net.thucydides.core.annotations.Managed;
import org.hamcrest.Matchers;
import org.openqa.selenium.WebDriver;
import questions.VerifyAddCartButton;
import tasks.NextPage;
import tasks.ProductList;
import tasks.SearchItems;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static utils.MessageError.ADD_TO_CART;

public class PurchaseItemStepDefinitions {
    @Managed
    private WebDriver hisBrower;
    @Before
    public void  setUp(){
        OnStage.setTheStage(Cast.ofStandardActors());
        OnStage.theActorCalled("The User");

    }
    @Given("^the user navigates on the web page (.*)$")
    public void theUserNavigatesOnTheWebPage(String url) {
        OnStage.theActorInTheSpotlight().can(BrowseTheWeb.with(hisBrower)).wasAbleTo(Open.url(url));
    }


    @When("^The user searches for (.*)$")
    public void theUserSearchesForAlexa(String nameSearch) {
        OnStage.theActorInTheSpotlight().attemptsTo(SearchItems.inAmazon(nameSearch));
    }

    @When("^The user navigates to the (.*) page$")
    public void theUserNavigatesToTheSecondPage(String pages) {
        OnStage.theActorInTheSpotlight().attemptsTo(NextPage.inAmazon(pages));
    }

    @When("^The user selects the (.*) item$")
    public void theUserSelectsTheThirdItem(String numberList) {
        OnStage.theActorInTheSpotlight().attemptsTo(ProductList.inAmazon(numberList));
    }

    @Then("^User will be able to add the item to the cart$")
    public void userWillBeAbleToAddTheItemToTheCart() {
        OnStage.theActorInTheSpotlight().should(seeThat(VerifyAddCartButton.inStock(), Matchers.is(true))
                .orComplainWith(MessageException.class,ADD_TO_CART));
    }

}
