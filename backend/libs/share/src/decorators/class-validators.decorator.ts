import { maxDbInt } from '../consts';
import { isDefined } from '../utils';
import {
    registerDecorator,
    ValidationOptions,
    isNotEmpty,
    isString,
    maxLength,
    isNumber,
} from 'class-validator';

export function IsNotEmpty(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isNotEmpty',
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions, message: 'Поле обязательно к заполнению' },
            validator: {
                validate(value) {
                    return isNotEmpty(value);
                },
            },
        });
    };
}

export function IsString(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isEmail',
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions, message: 'Поле должно быть строкой' },
            validator: {
                validate(value) {
                    return isString(value);
                },
            },
        });
    };
}

export function IsNumber(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isEmail',
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions, message: 'Поле должно быть числом' },
            validator: {
                validate(value) {
                    return isDefined(value) ? isNumber(value) : true;
                },
            },
        });
    };
}

export function IsPositiveInt(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isEmail',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                ...validationOptions,
                message: `Поле должно быть натуральным числом (или = 0) и не больше ${maxDbInt}`,
            },
            validator: {
                validate(value) {
                    return isDefined(value)
                        ? isNumber(value) && value >= 0 && value <= maxDbInt
                        : true;
                },
            },
        });
    };
}

export function MaxLength(max: number, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isEmail',
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions, message: `'Максимальная длина поля ${max} символов'` },
            validator: {
                validate(value) {
                    return isDefined(value) ? maxLength(value, max) : true;
                },
            },
        });
    };
}
