/**
 * 两种表单的type,供使用者判断
 */
declare enum FORM_TYPE {
    ANTD = "ANTD_FORM",
    XRENDER = "XRENDER FORM"
}
/**
 * 设置表单项状态接口
 */
interface IFieldData extends IField {
    /**
     * 错误信息
     */
    errors: string[];
}
interface IField {
    /**
     * 字段path
     */
    name: string;
    /**
     * touched状态
     */
    touched: boolean;
    /**
     * validating状态
     */
    validating: boolean;
    /**
     * value
     */
    value: any;
}
/**
 * Meta
 */
interface IMeta {
    /**
     * 用户操作过
     */
    touched: boolean;
    /**
     * 是否在较严重
     */
    validating: boolean;
}
/**
 * 设置报错信息
 */
interface IFieldError {
    /**
     * 错误的数据路径
     */
    name: string[];
    /**
     * 错误的内容
     */
    errors: string[];
}
interface IFormApi {
    /**
     * 获取单个表单向数据
     */
    getFieldValue: (name: string) => any;
    /**
     * 给单个表单项赋值
     */
    setFieldValue: (name: string, value: any) => void;
    /**
     * 获取一组表单项的值
     */
    getFieldsValue: (nameList?: string[], filterFunc?: (meta: Partial<IMeta>) => boolean) => Record<string, any>;
    /**
     * 设置整个表单的值
     */
    setFieldsValue: (values: Record<string, any> | any) => void;
    /**
     * 提交表单
     */
    submit: () => void;
    /**
     * 获取对应表单项的错误信息
     */
    getFieldError: (name: string) => string[];
    /**
     * 获取一组表单项的错误信息，返回为数组格式
     */
    getFieldsError: (nameList?: string[]) => IFieldError[];
    /**
     * 检查该表单项是否被用户操作过
     */
    isFieldTouched: (name: string) => boolean;
    /**
     * 检查该组表单项是否被用户操作过，如果allTouched为true时检查所有字段都被操作过
     */
    isFieldsTouched: (nameList?: string[], allTouched?: boolean) => boolean;
    /**
     * 该表单项是否正在校验
     */
    isFieldValidating: (name: string) => boolean;
    /**
     * 触发表单校验
     */
    validateFields: (nameList?: string[]) => Promise<any>;
    /**
     * 滚动到对应表单项位置
     */
    scrollToField: (fields?: string[]) => void;
    /**
     * 设置该组表单项状态
     */
    setFields: (fields: Partial<IFieldData>[]) => void;
    resetFields?: (fields?: string[]) => void;
    getFieldInstance?: (name: string) => any;
    setSchemaByPath?: (path: string, schema: Record<string, any>) => void;
    setSchema?: (schema: Record<string, Record<string, any>>) => void;
}
/**
 * usexform 返回api
 */
interface IForm {
    /**
     * 表单id/path
     */
    id: string;
    /**
     * 表单value
     */
    value: any;
    /**
     * 表单onChange
     */
    onChange: (value: any) => void;
    /**
     * form的类型
     */
    type: typeof FORM_TYPE[keyof typeof FORM_TYPE];
    /**
     * 挂载在form下的api
     */
    form: IFormApi;
}

declare const _default: (props: any) => IForm;

export { _default as default };
