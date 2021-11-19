package tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import userinsterfaces.ItemPages;

public class NextPage implements Task {
    @Override
    public <T extends Actor> void performAs(T actor) {
        String page = "2";
        int numberPage = Integer.parseInt(page);
        for (int i = 1; i < numberPage; i++) {
            actor.attemptsTo(Click.on(ItemPages.NUMBER_PAGE));
        }
    }
    public static NextPage inAmazon(){
        return Tasks.instrumented(NextPage.class);
    }
}
