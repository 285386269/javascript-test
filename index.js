/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (arrProps, arrObject) => {
    if(arrObject == null || arrObject.length === 0) return arrObject;
    for(let item of arrObject) {
        for(let prop of arrProps) {
            if(item.hasOwnProperty(prop)) {
                delete item[prop];
            }
        }
    }
    return arrObject;
};
exports.excludeByProperty = (flag, arrObject) => {
    if(arrObject == null || arrObject.length === 0) return arrObject;
    return arrObject.filter(item => {
        return !item.hasOwnProperty('deleted');
    })
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
        (objColor.red.includes(item.status) && (item.color = 'red')) || 
        (objColor.green.includes(item.status) && (item.color = 'green'));
        return item.hasOwnProperty('color');
    })
};
exports.createGreeting = (greet, greeting) => {
    return function(name) {
        return greet(greeting, name);
    }
};
exports.setDefaults = (defaultObj) => {
    return function(obj) {
        for(let prop in defaultObj) {
            if(!obj.hasOwnProperty(prop)) {
                obj[prop] = defaultObj[prop];
            }
        }
        return obj;
    }
};
exports.fetchUserByNameAndUsersCompany = (name, services) => {
    return services.fetchUsers().then(users => {
        return {
            company: {},
            status: 0,
            user: users.find(user => user.name == name),
        }
    }).then(data => {
        return Promise.all([services.fetchCompanyById(data.user.companyId),
        data, 
        services.fetchStatus()]).then(arrResults => {
            arrResults[1].company = arrResults[0];
            arrResults[1].status = arrResults[2];
            return arrResults[1];
        });
    })
};
