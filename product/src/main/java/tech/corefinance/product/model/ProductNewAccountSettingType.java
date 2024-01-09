package tech.corefinance.product.model;

public enum ProductNewAccountSettingType {
    /**
     * Sequential ID numbers that begin with a specified number.
     */
    INCREASEMENT,
    /**
     * Templates consist of the characters `#`, `@`, and `$`, where `#` specifies a number, `@` a letter, and `$` a number or a letter, chosen at random.
     * For example, `@#@#$` will configure system to generate five-character values of one letter, one number, one letter, one number, and one character
     * that is either a letter or a number, such as `B8J4P` or `P1F62`.
     */
    RANDOM_PATTERN
}
