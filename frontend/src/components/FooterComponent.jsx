const FooterComponent = () => {
	return (
		<footer className="flex justify-center h-10 bg-white items-center ">
			<div className="container">
				<p className="copyright font-bold text-lg text-center">
					Made by{' '}
					<a
						href="https://github.com/juanvs23"
						className="hover:text-sky-500 transition-colors duration-300"
						target="_blank"
						rel="noopener noreferrer"
					>
						Juanvs23
					</a>
				</p>
			</div>
		</footer>
	);
};

export default FooterComponent;
