package tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import userinsterfaces.ItemPages;

public class ProductList implements Task {
    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(Click.on(ItemPages.PRODUCT_NUMBER_POSITION.of("3")));
    }
    public static ProductList inAmazon(){
        return Tasks.instrumented(ProductList.class);
    }
}
