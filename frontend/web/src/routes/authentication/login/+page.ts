import { browser } from '$app/environment';
import { Authentication  } from '../../../services'
import { user } from '../../../store';

if (browser) {
    const auth = new Authentication();
}

