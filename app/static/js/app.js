import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
// import { DatePicker } from 'react-datepicker';

function PDFform() {
    return (

        <div className="row row-4">
            <div className="col-sm-12">
                <div className="files-upload-zone" template="/static/templates/weko_items_ui/upload.html"><div className="well">
                    <center>
                        Drop pdf here
                    </center>
                </div>
                    <p className="text-center legend"><strong>— OR —</strong></p>
                    <p className="text-center">
                        <button className="btn btn-primary" ngf-max-size="20GB" ngf-multiple="true" ngf-select="" ngf-change="hookAddFiles($files)">
                            Click to select for pdf
                        </button>
                    </p></div>
                <p className="text-center">
                    <button className="btn btn-success">
                        <span className="glyphicon glyphicon-plus"></span>&nbsp;
                        PDFからメタデータの自動入力
                    </button>
                </p>
            </div>
        </div>
    )
}

function FileUploadForm() {
    return (

        <div className="row row-4">
            <div className="col-sm-12">
                <div className="files-upload-zone" template="/static/templates/weko_items_ui/upload.html"><div className="well">
                    <center>
                        Drop file or folders here
                    </center>
                </div>
                    <p className="text-center legend"><strong>— OR —</strong></p>
                    <p className="text-center">
                        <button className="btn btn-primary" ngf-max-size="20GB" ngf-multiple="true" ngf-select="" ngf-change="hookAddFiles($files)">
                            Click to select
                        </button>
                    </p></div>
            </div>
        </div>
    )
}

function Metadatatitle({ title, metadatakey }) {
    var required = false;
    var classvalue;
    //このreplaceAllよくない気がする直す可能性あり
    if (schema.required.includes(metadatakey)) {
        required = true;
    }
    if (required) {
        classvalue = "col-sm-3 control-label field-required";
    } else {
        classvalue = "col-sm-3 control-label";
    }
    return (
        <label className={classvalue}>
            {title}
        </label>
    )
}

function Textform({ metadatatitle, value, order, item }) {
    var readonly = false;
    // とりあえず今は手打ちなのでコメントアウト
    // if ("readonly" in item && item.readonly == true) {
    //     readonly = true;
    // }
    return (
        <div className="form-group schema-form-text">
            <Metadatatitle title={metadatatitle} metadatakey={item.key} />
            <div className="col-sm-9">
                <input type="text"
                    className="form-control input-form"
                    id={item.key.replaceAll("[]", "[" + String(order) + "]")}
                    name={item.key.split(".")[item.key.split(".").length - 1]}
                    schema-validate="form"
                    defaultValue={value}
                    disabled={readonly}
                ></input>
            </div>
        </div>
    );
}

function Textareaform({ metadatatitle, value, order, item }) {
    return (
        <div className="form-group schema-form-textarea">
            <Metadatatitle title={metadatatitle} metadatakey={item.key} />
            <div className="col-sm-9">
                <textarea className="form-control input-form"
                    id={item.key.replaceAll("[]", "[" + String(order) + "]")}
                    name={item.key.split(".")[item.key.split(".").length - 1]}
                    schema-validate="form"
                    defaultValue={value}></textarea>
            </div>
        </div>
    );
}


function Selectform({ metadatatitle, map, order, value, item }) {
    const titlemap = [];
    map.forEach(element => {
        titlemap.push(
            <option label={element.name} value={element.value} key={item.key.replaceAll("[]", "[" + String(order) + "]") + element.value}></option>
        );
    })
    return (
        <div className="form-group schema-form-select">
            <Metadatatitle title={metadatatitle} metadatakey={item.key} />
            <div className="col-sm-9">
                <select className="form-control input-form" schema-validate="form" id={item.key.replaceAll("[]", "[" + String(order) + "]")} name={item.key.split(".")[item.key.split(".").length - 1]} defaultValue={value}>
                    <option value=""></option>
                    {titlemap}
                </select>
            </div>
        </div>

    )
}

// 未完成jpcoar2.0では使わない
function Radioform({ metadatatitle, map, order, value, item }) {
    const titlemap = [];
    map.forEach(element => {
        titlemap.push(
            <div className="radio">
                <label>
                    <input type="radio"
                        id={item.key.replaceAll("[]", "[" + String(order) + "]")}
                        name={item.key.replaceAll("[]", "[" + String(order) + "]")}
                        value={element.value} />
                    <span ng-bind-html="item.name">{element.name_i18n.ja}</span>
                </label>
            </div >
        );
    })

    return (
        <div className="form-group schema-form-radios">
            <Metadatatitle title={metadatatitle} metadatakey={item.key} />
            <div className="col-sm-9">
                {titlemap}
            </div>
        </div>
    )
}

function Fieldsetform({ order, value, item }) {


}

// 実装できていない。いまはとりあえず　input型である。
function Datepickerform({ order, value, item }) {
    // const [selectedDate, setSelectedDate] = useState<Date>();
    var metadatatitle = ("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title;
    return (
        <div className="form-group schema-form-datepicker">
            <Metadatatitle title={metadatatitle} metadatakey={item.key} />

            <div className="col-sm-9">
                <input type="data"
                    className="form-control input-form"
                    id={item.key.replaceAll("[]", "[" + String(order) + "]")}
                    name={item.key.split(".")[item.key.split(".").length - 1]}
                    schema-validate="form"
                    defaultValue={value}
                ></input>
            </div>
            {/* <DatePicker
                                dateFormat="yyyy-MM-dd"
                                locale="ja"
                                selected={selectedDate}
                                showTimeSelect
                                timeIntervals={30} /> */}
        </div>
    )
}

function Datelistform({ order, value, item }) {
    return (
        <Textform metadatatitle={("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title} value={""} order={order} item={item} />
    )
}

// 未完成jpcoar2.0では使わない
function Checkboxesform({ order, value, item }) {
    const titlemap = [];
    var metadatatitle = ("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title
    map = item.titleMap
    map.forEach(element => {
        titlemap.push(
            <label className="checkbox col-sm-4 checkbox-input">
                <input type="checkbox" className="touched" schema-vaidate="form" />
                <span style="overflow-wrap: break-word;">{element.name}</span>
            </label>
        );
    })
    return (
        <div className="form-group schema-form-select">
            <Metadatatitle title={metadatatitle} metadatakey={item.key} />
            <div className="col-sm-9">
                <div className="checkbox">
                    <select sf-changed="form" className="form-control" schema-validate="form" id={item.key.replaceAll("[]", "[" + String(order) + "]")} defaultValue={value}>
                        <option className value=""></option>
                        {titlemap}
                    </select>
                </div>
            </div>
        </div>
    )
}

function HTMLpicker({ html }) {

    return (<div>{html}</div>);
}

function Inputlist({ form, count }) {
    const input_field = [];
    if (!("items" in form)) {
        input_field.push(<Datepickerform order={count} item={form} key={form.key} />);
    } else {
        form.items.forEach(item => {
            if ("type" in item) {
                if (item.type === "text") {
                    input_field.push(
                        <Textform metadatatitle={("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title} value={""} order={count} item={item} key={item.key} />
                    );
                } else if (item.type === "textarea") {
                    input_field.push(
                        <Textareaform metadatatitle={("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title} map={item.titleMap} value={""} order={count} item={item} key={item.key} />
                    );
                } else if (item.type === "select") {
                    input_field.push(
                        <Selectform metadatatitle={("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title} map={item.titleMap} value={""} order={count} item={item} key={item.key} />
                    );
                } else if (item.type === "radios") {
                    input_field.push(
                        <Radioform metadatatitle={("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title} map={item.titleMap} value={""} order={count} item={item} key={item.key} />
                    );
                } else if (item.type === "fieldset") {
                    input_field.push(<Panelform title={("title_i18n" in item) && ("ja" in item.title_i18n) ? item.title_i18n.ja : item.title} form={item} order={count} key={item.key} />);
                } else if (item.type === "template") {
                    if ("templateUrl" in item) {
                        var template = item.templateUrl.split('/').pop()
                        if (template === "datepicker.html" || template === "datepicker_multi_format.html") {
                            input_field.push(<Datepickerform order={count} item={item} key={item.key} />);
                        } else if (template === "datalist.html") {
                            input_field.push(<Datelistform order={count} item={item} key={item.key} />);
                        } else if (template === "checkboxes.html") {
                            input_field.push(<Checkboxesform order={count} item={item} map={item.titleMap} key={item.key} />)
                        }
                    } else if ("template" in item) {
                        input_field.push(<div></div>);
                    }
                } else {
                    input_field.push(<div></div>);
                }

            } else {
                input_field.push(<Panelform form={item} key={item.key} />);
            }
        })
    };
    return (
        <div className="list-group">
            {input_field}
        </div>
    );
}

function Panelform({ form }) {
    const [count, setcount] = useState(0);
    const [inputlists, setInputlists] = useState([(<Inputlist form={form} count={count} key={form.key + "[" + String(count) + "]"} />)]);
    const [toggle, settoggle] = useState(" hidden");
    let isArray = " hidden";

    function addarray() {
        setInputlists(prevComponents => [...prevComponents,
        (<Inputlist form={form} count={count + 1} key={form.key + "[" + String(count + 1) + "]"} />
        )]);
        setcount(count + 1);
    }

    function reducearray(key) {
        setInputlists(prevItems => prevItems.filter(inputlist => inputlist.key !== key));
    }

    function togglepanel(){
        if (toggle==" hidden"){
            settoggle("")
        }else{
            settoggle(" hidden")
        }
    }

    if (form.add == "New") {
        isArray = "";
    }

    return (
        <fieldset className="schema-form-fieldset flexbox" id={form.key} name={form.key.split(".")[form.key.split(".").length - 1]}>
            <div className="panel panel-default deposit-panel">
                <div className="panel-heading"><a className="panel-toggle" onClick={()  => togglepanel()}>
                    {("title_i18n" in form) && ("ja" in form.title_i18n) ? form.title_i18n.ja : form.title}
                </a>
                </div>
                <div className={"panel-body panel-body2 list-group"+toggle}>
                    <div className="schema-form-array">
                        <div className="col-sm-12">
                            {inputlists.map(inputlist => (
                                <li className="list-group-item ui-sortable" id={form.key + "[" + count + "]"} key={inputlist.key}>
                                    <div className="close-container clear-form">
                                        <button type="button" className={"close pull-right" + isArray} onClick={() => reducearray(inputlist.key)}>
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    {inputlist}
                                </li>
                            ))}
                        </div>
                        <button onClick={() => addarray()} type="button" className={"btn btn-success pull-right" + isArray}>
                            <i className="glyphicon glyphicon-plus"></i>
                            New
                        </button>
                    </div>
                </div>
            </div>
        </fieldset >
    )
}



/**
 * Custom bs-datepicker.
 * Default bs-datepicker: just support one pattern for input.
 * Custom bs-datepicker: support validate three pattern.
 * Used way:
 *  templateUrl: /static/templates/weko_deposit/datepicker_multi_format.html
 *  customFormat: enter your pattern.
 *    if it none, pattern are yyyy-MM-dd, yyyy-MM, yyyy.
*/
var Pattern = {
    yyyy: '\\d{4}',
    MM: '(((0)[1-9])|((1)[0-2]))',
    dd: '([0-2][0-9]|(3)[0-1])',
    sep: '(-)'
}
var Format = {
    yyyyMMdd: '^(' + Pattern.yyyy + Pattern.sep +
        Pattern.MM + Pattern.sep + Pattern.dd + ')$',
    yyyyMM: '^(' + Pattern.yyyy + Pattern.sep + Pattern.MM + ')$',
    yyyy: '^(' + Pattern.yyyy + ')$',
}
var CustomBSDatePicker = {
    option: {
        element: undefined,
        defaultFormat: Format.yyyyMMdd + '|' + Format.yyyyMM + '|' + Format.yyyy,
        cls: 'multi_date_format'
    },
    /**
     * Clear validate status for this element.
    */
    init: function () {
        let $element = $(CustomBSDatePicker.option.element);
        let $this_parent = $element.parent().parent();
        $element.removeClass('ng-invalid ng-invalid-date ng-invalid-parse');
        $element.next().next().addClass('hide');
        $this_parent.removeClass('has-error');
    },
    /**
     * Get format from defined user on form schema.
     * If user don't defined, this pattern get default pattern.
     * Default pattern: option.defaultFormat.
     * @return {String} return pattern.
    */
    getPattern: function () {
        let def_pattern = CustomBSDatePicker.option.defaultFormat;
        let $element = $(CustomBSDatePicker.option.element);
        let pattern = $element.data('custom-format');
        return (pattern.length == 0) ? def_pattern : pattern;
    },
    /**
     * Check data input valid with defined pattern.
     * @return {Boolean} return true if value matched
    */
    isMatchRegex: function () {
        let $element = $(CustomBSDatePicker.option.element);
        let val = $element.val();
        let pattern = CustomBSDatePicker.getPattern();
        let reg = new RegExp(pattern);
        return reg.test(val);
    },
    /**
     * Check input required.
     * @return {Boolean} return true if input required
    */
    isRequired: function () {
        let $lement = $(CustomBSDatePicker.option.element);
        let $this_parent = $lement.parent().parent();
        let label = $this_parent.find('label');
        return label.hasClass('field-required');
    },
    /**
    * Get the number of days in any particular month
    * @param  {number} m The month (valid: 0-11)
    * @param  {number} y The year
    * @return {number}   The number of days in the month
    */
    daysInMonth: function (m, y) {
        switch (m) {
            case 1:
                return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
            case 8: case 3: case 5: case 10:
                return 30;
            default:
                return 31
        }
    },
    /**
    * Check if a date is valid
    * @param  {number}  d The day
    * @param  {number}  m The month
    * @param  {number}  y The year
    * @return {Boolean}   Returns true if valid
    */
    isValidDate: function (d, m, y) {
        let month = parseInt(m, 10) - 1;
        let checkMonth = month >= 0 && month < 12;
        let checkDay = d > 0 && d <= CustomBSDatePicker.daysInMonth(month, y);
        return checkMonth && checkDay;
    },
    /**
     * Check all validate for this.
     * All validation valid => return true.
     * @return {Boolean} Returns true if valid
    */
    isValidate: function () {
        let $element = $(CustomBSDatePicker.option.element);
        let val = $element.val();
        if (val.length == 0) {
            //Required input invalid.
            if (CustomBSDatePicker.isRequired()) return false;
        } else {
            //Data input is not match with defined pattern.
            if (!CustomBSDatePicker.isMatchRegex()) return false;
            //Check day by month and year.
            let arr = val.split('-');
            if (arr.length == 3 && !CustomBSDatePicker.isValidDate(arr[2], arr[1], arr[0])) return false;
        }
        return true;
    },
    /**
     * Check validate and apply css for this field.
    */
    validate: function () {
        let $element = $(CustomBSDatePicker.option.element);
        let $this_parent = $element.parent().parent();
        if (!CustomBSDatePicker.isValidate()) {
            $element.next().next().removeClass('hide');
            $this_parent.addClass('has-error');
        }
    },
    /**
     * This is mean function in order to validate.
     * @param {[type]} element date field
    */
    process: function (element) {
        CustomBSDatePicker.option.element = element;
        CustomBSDatePicker.init();
        CustomBSDatePicker.validate();
    },
    /**
    * Init attribute of model object if them undefine.
    * @param  {[object]}  model
    * @param  {[object]}  element is date input control.
    */
    initAttributeForModel: function (model, element) {
        if ($(element).val().length == 0) return;
        let ng_model = $(element).attr('ng-model').replace(/']/g, '');
        let arr = ng_model.split("['");
        //Init attribute of model object if them undefine.
        let str_code = '';
        $.each(arr, function (ind_01, val_02) {
            str_code += (ind_01 == 0) ? val_02 : "['" + val_02 + "']";
            let chk_str_code = '';
            if (ind_01 != arr.length - 1) {
                chk_str_code = "if(!" + str_code + ") " + str_code + "={};";
            }
            eval(chk_str_code);
        });
    },
    /**
    * Excute this function before 'Save' and 'Next' processing
    * Get data from fields in order to fill to model.
    * @param  {[object]}  model
    * @param  {[Boolean]}  reverse
    */
    setDataFromFieldToModel: function (model, reverse) {
        let cls = CustomBSDatePicker.option.cls;
        let element_arr = $('.' + cls);
        $.each(element_arr, function (ind, val) {
            CustomBSDatePicker.initAttributeForModel(model, val);
            if (reverse) {
                //Fill data from model to fields
                str_code = "$(val).val(" + $(val).attr('ng-model') + ")";
                try {
                    eval(str_code);
                } catch (e) {
                    // If the date on model is undefined, we can safetly ignore it.
                    if (!e instanceof TypeError) {
                        throw e;
                    }
                }
            } else {
                //Fill data from fields to model
                str_code = 'if ($(val).val().length != 0) {' + $(val).attr('ng-model') + '=$(val).val()}';
                eval(str_code);
            }
        });
    },
    /**
     * Get date fields name which invalid.
     * @return {array} Returns name list.
    */
    getInvalidFieldNameList: function () {
        let cls = CustomBSDatePicker.option.cls;
        let element_arr = $('.' + cls);
        let result = [];
        $.each(element_arr, function (ind, val) {
            let $element = $(val);
            let $parent = $element.parent().parent();
            if ($parent.hasClass('has-error')) {
                let name = $element.attr('name');
                let label = $("label[for=" + name + "]").text().trim();
                result.push(label);
            }
        });
        return result;
    },
    /**
     * If input empty, this attribute delete.
     * Fix bug: not enter data for date field.
    */
    removeLastAttr: function (model) {
        let cls = CustomBSDatePicker.option.cls;
        let element_arr = $('.' + cls);
        $.each(element_arr, function (ind, val) {
            if ($(val).val().length > 0) {
                CustomBSDatePicker.initAttributeForModel(model, val);
                let ng_model = $(val).attr('ng-model');
                let last_index = ng_model.lastIndexOf('[');
                let previous_attr = ng_model.substring(0, last_index);
                let str_code = "if(" + ng_model + "==''){" + previous_attr + "={}}";
                eval(str_code);
            }
        });
    }
}
const uploadpdf = createRoot(document.getElementById('upload_pdf_form_container'));
const uploadfile = createRoot(document.getElementById('upload_form_container'));
const root = createRoot(document.getElementById('input_form_container'));
let forms = null;
let schema = null;

fetch('/static/json/form.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // JSONデータを取得して解析する
    })
    .then(data => {
        forms = JSON.parse(data);
        return fetch('/static/json/jsonschema.json')
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // JSONデータを取得して解析する
    })
    .then(data => {
        schema = JSON.parse(data);
        const input_forms = [];
        var count = 0;
        forms.forEach(form => {
            if (!("system_prop" in schema.properties[form.key] && schema.properties[form.key].system_prop == true)) {
                input_forms.push(
                    <div className="form_metadata_property" key={form.key}>
                        <Panelform form={form} />
                    </div>
                )
                count++;
            }
        });
        uploadpdf.render(
            <PDFform />
        )
        uploadfile.render(
            <FileUploadForm />
        )
        root.render(
            <div className="form">
                {input_forms}
            </div>
        );
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


