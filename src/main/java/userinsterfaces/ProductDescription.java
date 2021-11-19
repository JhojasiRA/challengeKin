package userinsterfaces;

import net.serenitybdd.screenplay.targets.Target;

public class ProductDescription {
    public static final Target ADD_TO_CART = Target.the("Add to cart button").locatedBy("//*[@id='add-to-cart-button']");
}
