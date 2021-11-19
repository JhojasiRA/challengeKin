package tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Enter;
import org.openqa.selenium.Keys;
import userinsterfaces.HomePage;

public class SearchItems implements Task {
    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(Enter.theValue("Alexa").into(HomePage.SEARCH_BOX).thenHit(Keys.ENTER));

    }
    public static SearchItems inAmazon(){
        return Tasks.instrumented(SearchItems.class);
    }
}
