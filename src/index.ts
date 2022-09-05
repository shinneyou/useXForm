import React, { useState, useEffect, useCallback } from "react";
import {
  IFieldError,
  IForm,
  IFieldErrorX,
  IValidateData,
  IFieldData,
  IFormApi,
} from "./interface";
import { FORM_TYPE } from "./constans";
import { set } from "lodash-es";

const { XRENDER, ANTD } = FORM_TYPE;
const defaultFun = () => {
  console.warn("api调用失败，请使用该组件时传入form实例");
};
export default (props: any): IForm => {
  const { onChange, value, addons = {}, form } = props;
  const [type, setType] = useState(props.addons ? XRENDER : ANTD);
  const isXrender = !!props.addons;

  const setFieldsValueX = useCallback((values: Record<string, any>) => {
    const formData = addons.getValues();
    if (values) {
      const res = { ...formData };
      Object.keys(values).forEach((key) => {
        set(res, key, values[key]);
      });
      addons.setValues(res);
    }
  }, []);

  const setFieldValueAntd = useCallback((name: string, value: any) => {
    if (form.setFieldValue) {
      form.setFieldValue(name, value);
    } else {
      form.setFieldsValue({ [name]: value });
    }
  }, []);

  const submitX = useCallback(() => {
    console.warn(
      "当前使用的是 submit 方法，已与antd form方法保持一致无promise返回，你可使用validateFields 方法代替"
    );
    addons.submit();
  });

  const getFieldsErrorX = useCallback((nameList?: string[]): IFieldError => {
    const res = addons.getFieldsError(nameList);
    return res.map((item: IFieldErrorX) => {
      return {
        errors: item.error,
        name: [item.name],
      };
    });
  }, []);

  const validateFieldsX = useCallback((nameList?: string[]) => {
    return addons.validateFields(nameList).then(
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
    );
  });

  const setFieldsX = useCallback((fields: IFieldData[]) => {
    if (!Array.isArray(fields)) {
      console.warn("setFields args need Array, please check!");
    }
    addons.setValues(
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
  });

  const setSchemaByPathMixin = useCallback(
    (name: string, schema: Record<string, any>) => {
      console.warn(
        "当前使用的是 xrender setSchemaByPath 方法，仅支持在xrender中使用，请更换实现方式如在onValuesChange中处理联动逻辑"
      );
      if (isXrender) {
        addons.setSchemaAntdByPath(name, schema);
      }
    }
  );

  const setSchemaMixin = useCallback(
    (schema: Record<string, Record<string, any>>) => {
      console.warn(
        "当前使用的是 xrender setSchemaByPath 方法，仅支持在xrender中使用，请更换实现方式如在onValuesChange中处理联动逻辑"
      );
      if (isXrender) {
        addons.setSchema(schema);
      }
    }
  );

  useEffect(() => {
    const { addons = {} } = props;
    // 说明是xrender
    if (isXrender) {
      console.log(">>>>>> usexform creating, !!!use xrenderForm");
    } else {
      console.log(">>>>>> usexform creating, !!!use antdForm");
    }
  }, []);
  let formApis = {} as IFormApi;
  if (isXrender) {
    formApis = {
      getFieldValue: addons.getValue,
      setFieldValue: addons.setValueByPath, // @TODO: form.setFieldValue 这里待修改 4.22 才支持
      getFieldsValue: addons.getValues,
      setFieldsValue: setFieldsValueX,
      submit: submitX,
      getFieldError: addons.getFieldError,
      getFieldsError: getFieldsErrorX,
      isFieldTouched: addons.isFieldTouched,
      isFieldsTouched: addons.isFieldsTouched,
      isFieldValidating: addons.isFieldValidating,
      validateFields: validateFieldsX,
      scrollToField: addons.scrollToPath,
      setFields: setFieldsX,
    };
  } else {
    formApis = {
      getFieldValue: form.getFieldValue,
      setFieldValue: setFieldValueAntd, // @TODO: form.setFieldValue 这里待修改 4.22 才支持
      getFieldsValue: form.getFieldsValue,
      setFieldsValue: form.setFieldsValue,
      submit: form.submit,
      getFieldError: form.getFieldError,
      getFieldsError: form.getFieldsError,
      isFieldTouched: form.isFieldTouched,
      isFieldsTouched: form.isFieldsTouched,
      isFieldValidating: form.isFieldValidating,
      validateFields: form.validateFields,
      scrollToField: form.scrollToField,
      setFields: form.setFields,
    };
  }
  return {
    type,
    onChange,
    value,
    id: isXrender ? props?.addons?.dataPath : props?.form?.id,
    form: {
      // getFieldValue: isXrender ? addons.getValue : form.getFieldValue,
      // setFieldValue: isXrender ? addons.setValueByPath : form.setFieldValue, // @TODO: form.setFieldValue 这里待修改 4.22 才支持
      // getFieldsValue: isXrender ? addons.getValues : form.getFieldsValue,
      // setFieldsValue: isXrender ? setFieldsValueX : form.setFieldsValue,
      // submit: isXrender ? submitX : form.submit,
      // getFieldError: isXrender ? addons.getFieldError : form.getFieldError,
      // getFieldsError: isXrender ? getFieldsErrorX : form.getFieldsError,
      // isFieldTouched: isXrender ? addons.isFieldTouched : form.isFieldTouched,
      // isFieldsTouched: isXrender
      //   ? addons.isFieldsTouched
      //   : form.isFieldsTouched,
      // isFieldValidating: isXrender
      //   ? addons.isFieldValidating
      //   : form.isFieldValidating,
      // validateFields: isXrender ? validateFieldsX : form.validateFields,
      // scrollToField: isXrender ? addons.scrollToPath : form.scrollToField,
      // setFields: isXrender ? setFieldsX : form.setFields,
      ...formApis,
      setSchemaByPath: setSchemaByPathMixin,
      setSchema: setSchemaMixin,
    },
  };
};
