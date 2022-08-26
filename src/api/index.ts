import {
  IFieldErrorX,
  IFieldError,
  IValidateData,
  IFieldData,
} from "../interface";
import { set } from "lodash-es";

export const transformSubmit = (fn: Function) => {
  function transformFn() {
    console.warn(
      "当前使用的是 submit 方法，已与antd form方法保持一致无promise返回，你可使用validateFields 方法代替"
    );
    fn();
  }
  return transformFn;
};

export const transformSetFieldsValue = (fn: Function, getValues: Function) => {
  const transformFn = (values: Record<string, any>) => {
    const formData = getValues();
    if (values) {
      const res = { ...formData };
      Object.keys(values).forEach((key) => {
        set(res, key, values[key]);
      });
      fn(res);
    }
  };
  return transformFn;
};
export const transformGetFieldsError = (fn: Function): Function => {
  function transformFn(nameList?: string[]): IFieldError {
    const res = fn(nameList);
    return res.map((item: IFieldErrorX) => {
      return {
        errors: item.error,
        name: [item.name],
      };
    });
  }
  return transformFn;
};

export const transformValidateFields = (fn: Function): Function => {
  function transformFn(nameList?: string[]): Promise<any> {
    return new Promise(
      fn(nameList).then(
        (res: Record<string, any>) => {
          return Promise.resolve(res);
        },
        (errorRes: IValidateData) => {
          return Promise.reject({
            errorFields: errorRes.errors.map((item: IFieldErrorX) => {
              return {
                errors: item.error,
                name: [item.name],
              };
            }),
            values: errorRes.data,
          });
        }
      )
    );
  }
  return transformFn;
};

export const transformSetFields = (fn: Function): Function => {
  function transformFn(fields: IFieldData[]): void {
    if (!Array.isArray(fields)) {
      console.warn("setFields args need Array, please check!");
    }
    fn(
      (fields || []).map((item: IFieldData) => {
        return {
          error: item.errors,
          name: item.name,
          touched: item.touched,
          validating: item.validating,
          value: item.value,
        };
      })
    );
  }
  return transformFn;
};

export const setFieldValueAntd = (name: string, value: any) => {};
