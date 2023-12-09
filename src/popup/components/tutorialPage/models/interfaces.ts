export interface IExtensionComponents{
    [key: string]: IExtensionComponent;
}

export interface IExtensionComponent{
    name?: string;
    description?: string;
    howTo?: string;
    example?: string;
    HowToAddNewLogic?: string;
    images?: string[];
    layoutOfPage?: string;
    flag?: boolean;
    link?: string;
}