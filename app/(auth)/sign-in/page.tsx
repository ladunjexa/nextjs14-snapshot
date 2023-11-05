import Auth from '@/components/forms/Auth';

import {SignInValidation} from '@/lib/validations';

export default function Page() {
  return <Auth action="SignIn" formSchema={SignInValidation} />;
}
