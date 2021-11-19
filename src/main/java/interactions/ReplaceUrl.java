package interactions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Interaction;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class ReplaceUrl implements Interaction {
    @Override
    public <T extends Actor> void performAs(T actor) {
        String url = BrowseTheWeb.as(actor).getDriver().getCurrentUrl();
        String url_new = url.replaceAll("https://www.amazon.com/s?k=Alexa&ref=nb_sb_noss_2", "https://www.amazon.com/s?k=Alexa&page=2");
        BrowseTheWeb.as(actor).getDriver().navigate().to(url_new);

    }
    public static ReplaceUrl inAmazon(){
        return instrumented(ReplaceUrl.class);
    }
}
