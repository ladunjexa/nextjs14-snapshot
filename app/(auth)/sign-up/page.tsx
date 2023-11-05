import Auth from '@/components/forms/Auth';

import {SignUpValidation} from '@/lib/validations';

export default function Page() {
  return <Auth action="SignUp" formSchema={SignUpValidation} />;
}
