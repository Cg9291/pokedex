const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
	e.preventDefault();
	const formData = new FormData(e.currentTarget);
	const submittedData = Object.fromEntries(formData.entries()).myInput;
	console.log(submittedData);
};

export default handleSubmit;
