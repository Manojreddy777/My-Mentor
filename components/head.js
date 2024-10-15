import NextHead from "next/head";
import { string } from "prop-types";

const defaultDescription = "Finari Services Pvt Ltd was incorporated in June 2021 with 30 years of cumulative experience of founders in core banking domain. We offer consulting & services in core banking package software and web technology domains project.";
const defaultKeywords = "finariservices,Avaloq,CoreBanking,finari";
const defaultOGURL = "finari.com";
const defaultOGImage = "/assets/favicon.png";
const defaultTitle = "Finari Services";

const Head = (props) => {
	return (
		<NextHead>
			<meta charSet="UTF-8" />
			<title>
				{props.title !== undefined
					? `${props.title
						.toLowerCase()
						.split(" ")
						.map(
							(word) =>
								word.charAt(0).toUpperCase() + word.slice(1)
						)
						.join(" ")} | ${defaultTitle}`
					: defaultTitle}
			</title>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1 user-scalable=no maximum-scale=1.0"
			/>
			<meta
				name="description"
				content={props.description || defaultDescription}
			/>
			<meta name="keywords" content={props.keywords || defaultKeywords} />
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/assets/favicon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/assets/favicon.png"
			/>
			<link rel="shortcut icon" href="/assets/favicon.png" />
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/assets/favicon.png"
			/>
			<link
				rel="mask-icon"
				href="/static/favicon-mask.svg"
				color="#000000"
			/>
			<meta property="og:url" content={props.url || defaultOGURL} />
			<meta
				property="og:title"
				content={
					props.title !== undefined
						? `${props.title} | ${defaultTitle}`
						: defaultTitle
				}
			/>
			<meta
				property="og:description"
				content={props.description || defaultDescription}
			/>
			<meta name="twitter:site" content={props.url || defaultOGURL} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta
				name="twitter:image"
				content={props.ogImage || defaultOGImage}
			/>
			<meta
				property="og:image"
				content={props.ogImage || defaultOGImage}
			/>
			<meta property="og:image:width" content="256" />
			<meta property="og:image:height" content="256" />

			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link
				rel="preconnect"
				href="https://fonts.gstatic.com"
				crossOrigin="true"
			/>
			<link
				href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
				rel="stylesheet"
			/>
			{/* <link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
				integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
				crossOrigin="anonymous"
			/> */}
			{true && (
				<script async src="https://www.googletagmanager.com/gtag/js?id=UA-206755647-1">
				</script>
			)}

			{true && (
				<script
					dangerouslySetInnerHTML={{
						__html: ` window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
					
							gtag('config', 'UA-206755647-1');`,
					}}
				/>
			)}
		</NextHead>
	);
};

Head.propTypes = {
	title: string,
	description: string,
	keywords: string,
	url: string,
	ogImage: string,
};

export default Head;
