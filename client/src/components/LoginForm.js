import React, { useRef, useState } from "react";
import { Button } from "reactstrap";

function LoginForm({ handleLogin, error, loading }) {
	const [showPassword, setShowPassword] = useState(false);

	const emailRef = useRef();
	const passwordRef = useRef();

	const handleShowPassword = (event) => {
		console.log("chexbox checked?", event.target.checked);
		setShowPassword(event.target.checked);
	};

	return (
		<div className="login-form-block">
			{error && (
				<div>
					<p>Oops, there was an error logging you in.</p>
					<p>
						<i>{error.message}</i>
					</p>
				</div>
			)}
			<form
				onSubmit={(e) =>
					handleLogin(e, { email: emailRef.current.value, password: passwordRef.current.value })
				}>
				<div className="form-group mt-2">
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
						placeholder="Enter email"
						ref={emailRef}
						required
					/>
				</div>
				<div className="form-group mt-2">
					<label htmlFor="password">Password</label>
					<input
						type={showPassword ? "text" : "password"}
						className="form-control"
						id="password"
						placeholder="Password"
						ref={passwordRef}
						required
					/>
				</div>
				<div>
					<label>
						<input
							className="form-group"
							type="checkbox"
							onChange={handleShowPassword}
							defaultChecked={showPassword}
						/>{" "}
						show password
					</label>
				</div>
				<Button type="submit" className="btn btn-dark mt-4">
					Submit
				</Button>
			</form>
		</div>
	);
}

export default LoginForm;
