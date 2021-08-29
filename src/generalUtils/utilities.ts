export function camelToUnderscore(key) {
  return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function camelCaseKeysToUnderscore(obj) {
  if (typeof obj != "object") return obj;

  for (var oldName in obj) {
    // Camel to underscore
    let newName = oldName.replace(/([A-Z])/g, function ($1) {
      return "_" + $1.toLowerCase();
    });

    // Only process if names are different
    if (newName != oldName) {
      // Check for the old property name to avoid a ReferenceError in strict mode.
      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    }

    // Recursion
    if (typeof obj[newName] == "object") {
      obj[newName] = camelCaseKeysToUnderscore(obj[newName]);
    }
  }
  return obj;
}

import jwt_decode from "jwt-decode";
import { camelCase } from "lodash";
import { constants } from "src/modules/auth/constants";
import { User } from "src/modules/users/users.entity";

export const camelizeKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {}
    );
  }
  return obj;
};

export const verifyTenant = async (req) => {
  let domainPrefix;
  let user;
  let organizationId;
  const { rawHeaders, headers } = req;
  const token = headers.authorization?.split(" ");
  const UrlHostArray = headers.host?.split(".");
  if (UrlHostArray?.length > 1) {
    domainPrefix = UrlHostArray[0];
  }
  if (token) {
    const decoded: any = jwt_decode(token[1]);
    const email = decoded.email;

    user = await User.findOne({ email });
    organizationId = user?.organizationId;
  }

  if (
    (user.organization && user.organization.domainPrefix.toLowerCase() == domainPrefix.toLowerCase()) ||
    user.type == constants.SuperAdminTypeName
  ) {
    return true;
  } else {
    return false;
    // throw new BadRequestException("Invalid Domain Prefix");
  }
};
