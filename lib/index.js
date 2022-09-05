'use strict';

var react = require('react');
var set = require('lodash-es/set');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var set__default = /*#__PURE__*/_interopDefaultLegacy(set);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var FORM_TYPE = {
    ANTD: "ANTD_FORM",
    XRENDER: "XRENDER FORM",
};

var XRENDER = FORM_TYPE.XRENDER, ANTD = FORM_TYPE.ANTD;
var index = (function (props) {
    var _a, _b;
    var onChange = props.onChange, value = props.value, _c = props.addons, addons = _c === void 0 ? {} : _c, form = props.form;
    var _d = react.useState(props.addons ? XRENDER : ANTD), type = _d[0]; _d[1];
    var isXrender = !!props.addons;
    var setFieldsValueX = react.useCallback(function (values) {
        var formData = addons.getValues();
        if (values) {
            var res_1 = __assign({}, formData);
            Object.keys(values).forEach(function (key) {
                set__default["default"](res_1, key, values[key]);
            });
            addons.setValues(res_1);
        }
    }, []);
    var setFieldValueAntd = react.useCallback(function (name, value) {
        var _a;
        if (form.setFieldValue) {
            form.setFieldValue(name, value);
        }
        else {
            form.setFieldsValue((_a = {}, _a[name] = value, _a));
        }
    }, []);
    var submitX = react.useCallback(function () {
        console.warn("当前使用的是 submit 方法，已与antd form方法保持一致无promise返回，你可使用validateFields 方法代替");
        addons.submit();
    }, []);
    var getFieldsErrorX = react.useCallback(function (nameList) {
        var res = addons.getFieldsError(nameList);
        return res.map(function (item) {
            return {
                errors: item.error,
                name: [item.name],
            };
        });
    }, []);
    var validateFieldsX = react.useCallback(function (nameList) {
        return addons.validateFields(nameList).then(function (res) {
            return Promise.resolve(res);
        }, function (errorRes) {
            return Promise.reject({
                errorFields: errorRes.errors.map(function (item) {
                    return {
                        errors: item.error,
                        name: [item.name],
                    };
                }),
                values: errorRes.data,
            });
        });
    }, []);
    var setFieldsX = react.useCallback(function (fields) {
        if (!Array.isArray(fields)) {
            console.warn("setFields args need Array, please check!");
        }
        addons.setValues((fields || []).map(function (item) {
            return {
                error: item.errors,
                name: item.name,
                touched: item.touched,
                validating: item.validating,
                value: item.value,
            };
        }));
    }, []);
    var setSchemaByPathMixin = react.useCallback(function (name, schema) {
        console.warn("当前使用的是 xrender setSchemaByPath 方法，仅支持在xrender中使用，请更换实现方式如在onValuesChange中处理联动逻辑");
        if (isXrender) {
            addons.setSchemaAntdByPath(name, schema);
        }
    }, []);
    var setSchemaMixin = react.useCallback(function (schema) {
        console.warn("当前使用的是 xrender setSchemaByPath 方法，仅支持在xrender中使用，请更换实现方式如在onValuesChange中处理联动逻辑");
        if (isXrender) {
            addons.setSchema(schema);
        }
    }, []);
    var resetFieldsMinxin = react.useCallback(function (fields) {
        console.warn("当前使用的是 antd Form resetFields 方法，仅支持在antd Form中使用，请更换实现方式");
        if (!isXrender) {
            form.resetFields(fields);
        }
    }, []);
    var getFieldInstanceMinxin = react.useCallback(function (name) {
        console.warn("当前使用的是 antd Form getFieldInstance 方法，仅支持在antd Form中使用，请更换实现方式");
        if (!isXrender) {
            return form.getFieldInstance(name);
        }
    });
    react.useEffect(function () {
        props.addons;
        // 说明是xrender
        if (isXrender) {
            console.log(">>>>>> usexform creating, !!!use xrenderForm");
        }
        else {
            console.log(">>>>>> usexform creating, !!!use antdForm");
        }
    }, []);
    var formApis = {};
    if (isXrender) {
        formApis = {
            getFieldValue: addons.getValue,
            setFieldValue: addons.setValueByPath,
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
    }
    else {
        formApis = {
            getFieldValue: form.getFieldValue,
            setFieldValue: setFieldValueAntd,
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
        type: type,
        onChange: onChange,
        value: value,
        id: isXrender ? (_a = props === null || props === void 0 ? void 0 : props.addons) === null || _a === void 0 ? void 0 : _a.dataPath : (_b = props === null || props === void 0 ? void 0 : props.form) === null || _b === void 0 ? void 0 : _b.id,
        form: __assign(__assign({}, formApis), { setSchemaByPath: setSchemaByPathMixin, setSchema: setSchemaMixin, getFieldInstance: getFieldInstanceMinxin, resetFields: resetFieldsMinxin }),
    };
});

module.exports = index;
