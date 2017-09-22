import * as _ from 'lodash';

export class EntityUtils {

  handleError(entity: any, res: any) {
    if (res.code == 409) {
      this.handleObjError(entity, res);
    } else if (res.code == 400) {
      if (typeof res.error === 'object') {
        this.handleObjError(entity, res);
      } else {
        entity.error = res.error;
      }
    } else if (res.code == 500) {
      if (res.error.error_message) {
        entity.error = res.error.error_message;
      } else {
        entity.error = 'Server error: ' + res.error;
      }
    } else {
      entity.error = 'Fatal error! Check logs.';
      console.log("Unknown error code", res.code);
    }
  }

  handleObjError(entity: any, res: any) {
    entity.error = '';
    for (let i in res.error) {
      if (res.error.hasOwnProperty(i)) {
        let field = res.error[i];
        let fc: any = _.find(entity.fieldConfig, {'name' : i});
        if (fc) {
          let errors = '';
          field.forEach((item, j) => { errors += item + ' '; });
          fc.hasErrors = true;
          fc.errors = errors;
        } else {
          field.forEach((item, j) => { entity.error += item + '<br />'; });
        }
      }
    }
  }

  flattenData(data, level = 0, parent?: any) {
    let ndata = [];
    data.forEach((item) => {
      item._level = level;
      if (parent) {
        item._parent = parent.id;
      }
      ndata.push(item);
      if (item.children) {
        ndata = ndata.concat(this.flattenData(item.children, level + 1, item));
      }
      delete item.children;
    });
    return ndata;
  }

  bool(v) {
    return v === "false" || v === "null" || v === "NaN" || v === "undefined" ||
                   v === "0"
               ? false
               : !!v;
  }
}
