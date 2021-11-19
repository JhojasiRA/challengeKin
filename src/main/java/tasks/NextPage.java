package tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import userinsterfaces.ItemPages;

public class NextPage implements Task {
    private String page;
    public NextPage(String page) {
        this.page = page;
    }
    @Override
    public <T extends Actor> void performAs(T actor) {
        int numberPage = Integer.parseInt(page);
        for (int i = 1; i < numberPage; i++) {
            actor.attemptsTo(Click.on(ItemPages.NUMBER_PAGE));
        }
    }
    public static NextPage inAmazon(String page){
        return Tasks.instrumented(NextPage.class,page);
    }
}
