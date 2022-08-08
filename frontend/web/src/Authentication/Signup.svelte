<script lang="ts">
    import { Authentication } from './authentication';
    let auth = Authentication.Instance;
    let newUser = {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    };
    let onRegister = () => {
        auth.registerUser(newUser.email,newUser.firstName,newUser.lastName,newUser.password);
    };
</script>

<div class="container border">
    <div class="row">
        <div class="col-md-5 mx-auto">
            <div id="second">
                <div class="myform form ">
                    <div class="logo mb-3">
                        <div class="col-md-12 text-center">
                            <h1>Signup</h1>
                        </div>
                    </div>
                    <form action="#" name="registration">
                        <div class="form-group">
                            <label for="exampleInputEmail1">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                class="form-control"
                                id="firstname"
                                required
                                aria-describedby="emailHelp"
                                placeholder="Enter Firstname"
                                bind:value={newUser.firstName}
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                class="form-control"
                                id="lastname"
                                required
                                aria-describedby="emailHelp"
                                placeholder="Enter Lastname"
                                bind:value={newUser.lastName}
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label
                            >
                            <input
                                type="email"
                                name="email"
                                required
                                class="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                bind:value={newUser.email}
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                                class="form-control"
                                aria-describedby="emailHelp"
                                placeholder="Enter Password"
                                bind:value={newUser.password}
                            />
                        </div>
                        <div class="col-md-12 text-center mb-3">
                            <button
                                on:click|preventDefault={onRegister}
                                type="submit"
                                class=" btn btn-block mybtn btn-primary tx-tfm"
                                >Create Account</button
                            >
                        </div>
                        <div class="col-md-12 ">
                            <div class="form-group">
                                <p class="text-center">
                                    <a href="/login" id="signin"
                                        >Already have an account?</a
                                    >
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
