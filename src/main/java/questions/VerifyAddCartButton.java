package questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Visibility;
import userinsterfaces.ProductDescription;

public class VerifyAddCartButton implements Question<Boolean> {
    @Override
    public Boolean answeredBy(Actor actor) {
        return Visibility.of(ProductDescription.ADD_TO_CART).viewedBy(actor).asBoolean();

    }
    public static VerifyAddCartButton inStock() {
        return new VerifyAddCartButton();
    }

}
