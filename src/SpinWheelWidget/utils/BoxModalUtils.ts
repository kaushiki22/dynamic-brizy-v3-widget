type MarginConfig = Record<string, any>;

export function getSpinScreenMarginStyle(config: Record<string, any>, screenName: String) {
    const type = config[`${screenName}-marginType`];

    if (type === "grouped") {
        return {
            margin: `${config[`${screenName}-margin`]}${config[`${screenName}-marginSuffix`]}`
        };
    } else {
        return {
            marginTop: `${config[`${screenName}-marginTop`]}${config[`${screenName}-marginTopSuffix`]}`,
            marginRight: `${config[`${screenName}-marginRight`]}${config[`${screenName}-marginRightSuffix`]}`,
            marginBottom: `${config[`${screenName}-marginBottom`]}${config[`${screenName}-marginBottomSuffix`]}`,
            marginLeft: `${config[`${screenName}-marginLeft`]}${config[`${screenName}-marginLeftSuffix`]}`,
        };
    }
}

type PaddingConfig = Record<string, any>;

export function getSpinScreenPaddingStyle(config: PaddingConfig, screenName: String) {
    const type = config[`${screenName}-paddingType`];

    if (type === "grouped") {
        // One value for all sides
        return {
            padding: `${config[`${screenName}-padding`]}${config[`${screenName}-paddingSuffix`]}`
        };
    } else {
        // Individual values for each side
        return {
            paddingTop: `${config[`${screenName}-paddingTop`]}${config[`${screenName}-paddingTopSuffix`]}`,
            paddingRight: `${config[`${screenName}-paddingRight`]}${config[`${screenName}-paddingRightSuffix`]}`,
            paddingBottom: `${config[`${screenName}-paddingBottom`]}${config[`${screenName}-paddingBottomSuffix`]}`,
            paddingLeft: `${config[`${screenName}-paddingLeft`]}${config[`${screenName}-paddingLeftSuffix`]}`,
        };
    }
}

type BorderWidthConfig = Record<string, any>;

export function getSpinScreenBorderWidthStyle(config: BorderWidthConfig, screenName: String, borderColorName: String, borderType?: string) {
    const type = config[`${screenName}-widthType`];

    const borderStyle: Record<string, string> = {
        borderStyle: config[`${borderType}`] || "solid",
        borderColor: config[`${borderColorName}`] || "transparent" // default to transparent instead of red
    };

    if (type === "grouped") {
        return {
            borderWidth: `${config[`${screenName}-width`]}${config[`${screenName}-widthSuffix`]}`,
            ...borderStyle
        };
    } else {
        return {
            borderTopWidth: `${config[`${screenName}-widthTop`]}${config[`${screenName}-widthTopSuffix`]}`,
            borderRightWidth: `${config[`${screenName}-widthRight`]}${config[`${screenName}-widthRightSuffix`]}`,
            borderBottomWidth: `${config[`${screenName}-widthBottom`]}${config[`${screenName}-widthBottomSuffix`]}`,
            borderLeftWidth: `${config[`${screenName}-widthLeft`]}${config[`${screenName}-widthLeftSuffix`]}`,
            ...borderStyle
        };
    }
}

type BorderRadiusConfig = Record<string, any>;

export function getSpinScreenBorderRadiusStyle(config: BorderRadiusConfig, screenName: string) {
    const type = config[`${screenName}Type`];

    if (type === "grouped") {
        return {
            borderRadius: `${config[`${screenName}`]}${config[`${screenName}Suffix`]}`
        };
    } else {
        return {
            borderTopLeftRadius: `${config[`${screenName}TopLeft`]}${config[`${screenName}TopLeftSuffix`]}`,
            borderTopRightRadius: `${config[`${screenName}TopRight`]}${config[`${screenName}TopRightSuffix`]}`,
            borderBottomRightRadius: `${config[`${screenName}BottomRight`]}${config[`${screenName}BottomRightSuffix`]}`,
            borderBottomLeftRadius: `${config[`${screenName}BottomLeft`]}${config[`${screenName}BottomLeftSuffix`]}`
        };
    }
}