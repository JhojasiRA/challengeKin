package stepdefinitions;

import cucumber.api.java.Before;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import net.serenitybdd.screenplay.actions.Open;
import net.serenitybdd.screenplay.actors.Cast;
import net.serenitybdd.screenplay.actors.OnStage;
import net.thucydides.core.annotations.Managed;
import org.openqa.selenium.WebDriver;

public class PurchaseItemStepDefinitions {
    @Managed
    private WebDriver hisBrower;
    @Before
    public void  setUp(){
        OnStage.setTheStage(Cast.ofStandardActors());
        OnStage.theActorCalled("The User");

    }
    @Given("^the user navigates on the web page$")
    public void theUserNavigatesOnTheWebPage() {
        OnStage.theActorInTheSpotlight().can(BrowseTheWeb.with(hisBrower)).wasAbleTo(Open.url("https://www.amazon.com/"));
    }


    @When("^The user searches for Alexa$")
    public void theUserSearchesForAlexa() {

    }

    @When("^The user navigates to the second page$")
    public void theUserNavigatesToTheSecondPage() {

    }

    @When("^The user selects the third item$")
    public void theUserSelectsTheThirdItem() {

    }

    @Then("^User will be able to add tje item to the cart$")
    public void userWillBeAbleToAddTjeItemToTheCart() {

    }

}
