<script lang="ts">
    import { Authentication } from '../../services';
    let auth = Authentication.Instance;
    let authData = {
        email: "",
        verificationCode: "",
    };
    let onLogin = () => {
        auth.verifyUser(authData.email,authData.verificationCode);
    };
</script>

<style>
    .container {
        width: 50%;
        margin-top: 5%;
    }
</style>

<div class="container border">
    <div class="row">
        <div class="col-md-5 mx-auto">
            <div id="login">
                <div class="myform form ">
                    <div class="logo mb-3">
                        <div class="col-md-12 text-center">
                            <h1>Verify User</h1>
                        </div>
                    </div>
                    <form
                        action=""
                        method="post"
                        name="login"
                    >
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label
                            >
                            <input
                                type="email"
                                name="email"
                                class="form-control"
                                id="email"
                                required
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                bind:value={authData.email}
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Verification Code</label>
                            <input
                                type="text"
                                name="code"
                                id="code"
                                class="form-control"
                                required
                                aria-describedby="emailHelp"
                                placeholder="Enter VerificationCode"
                                bind:value={authData.verificationCode}
                            />
                        </div>
                        <div class="col-md-12 text-center ">
                            <button
                                on:click|preventDefault={onLogin}
                                type="submit"
                                class=" btn btn-block mybtn btn-primary tx-tfm"
                                >Login</button
                            >
                        </div>
                        <div class="form-group">
                            <p class="text-center">
                                Don't have account? <a href="/signup" id="signup"
                                    >Sign up here</a
                                >
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
