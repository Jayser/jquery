import { createValidator, required } from '../../../../utils/validation';

export default createValidator({
  firstName: [ required ],
  lastName: [ required ],
  phoneNumber: [ required ]
});
