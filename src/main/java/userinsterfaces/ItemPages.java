package userinsterfaces;

import net.serenitybdd.screenplay.targets.Target;

public class ItemPages {
    public static final Target NUMBER_PAGE = Target.the("number page").locatedBy("//a[text()='Next']");
    public static final Target PRODUCT_NUMBER_POSITION = Target.the("product number position").locatedBy("(//*[@class = 'a-section aok-relative s-image-fixed-height'])[{0}]");
}
