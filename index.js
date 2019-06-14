/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (arrProps, arrObject) => {
    if(arrObject == null || arrObject.length === 0) return arrObject;
    return arrObject.map(item =>{
        Object.keys(item).forEach(subItem => arrProps.includes(subItem) && delete item[subItem]);
        return item;
    });
};
exports.excludeByProperty = (flag, arrObject) => {
    if(arrObject == null || arrObject.length === 0) return arrObject;
    return arrObject.filter(item => !item.hasOwnProperty('deleted'));
};
exports.sumDeep = (arrObject) => {
    if(arrObject == null || arrObject.length === 0) return arrObject;
    return arrObject.map(item => {
        return {objects : item.objects.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.val;
        }, 0)};
    });
};
exports.applyStatusColor = (objColor, arrObject) => {
    return arrObject.filter(item => {
        Object.keys(objColor).forEach(prop => {
            objColor[prop].includes(item.status) && (item.color = prop);
        });
        return item.hasOwnProperty('color');
    });
};
exports.createGreeting = (greet, greeting) => {
    return function(name) {
        return greet(greeting, name);
    }
};
exports.setDefaults = (defaultObj) => {
    return function(obj) {
        for(let prop in defaultObj) {
            !obj.hasOwnProperty(prop) && (obj[prop] = defaultObj[prop]);
        }
        return obj;
    }
};
exports.fetchUserByNameAndUsersCompany = async (name, services) => {
    let result = {
        company: {},
        status: 0,
        user: null,
    }
    let users = await services.fetchUsers();
    result.user = users.find(user => user.name == name);
    return Promise.all([services.fetchCompanyById(result.user.companyId), 
        services.fetchStatus()]).then(arrResult => {
        result.company = arrResult[0];
        result.status = arrResult[1];
        return result;
    })
};
