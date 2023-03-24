<template>
	<div class="show_body">
		<div class="body_header">
			<div class="header_left slot">
				<slot name="1"></slot>
			</div>
			<div class="header_main slot">
				<slot name="2"></slot>
			</div>
			<div class="header_right slot">
				<slot name="3"></slot>
			</div>
		</div>
		<div class="body_main">
			<div class="body_left slot">
				<slot name="4"></slot>
			</div>
			<div class="body_right slot">
				<slot name="5"></slot>
			</div>
		</div>
		<div class="body_footer">
			<div class="footer_left slot">
				<slot name="6"></slot>
			</div>
			<div class="footer_right slot">
				<slot name="7"></slot>
			</div>
		</div>
		
	</div>
</template>

<script>
</script>

<style scoped lang="scss">
	.show_body{
		width: 100%;
		height: 92%;
		display: flex;
		flex-direction:column;
		padding-top: 10px;
		div{
			div{
				border: 1px solid #ccc;
			}
		}
		.body_header{
			display: flex;
			width: 100%;
			height: 32%;
			 div {
					height: 100%;
					margin-left:  10px;
					width: 32%;
				}
			.header_right{
				margin-right: 10px;
			}
		}
		.body_main{
			display: flex;
			width: 100%;
			height: 32%;
			margin: 10px auto;
			 .body_left {
					height: 100%;
					margin: 0 10px;
					width: 70%;
				}
			.body_right {
								height: 100%;
								margin-right:10px;
								width: 30%;
							}
		}
		.body_footer{
			display: flex;
			width: 100%;
			height: 32%;
			 .footer_left {
					height: 100%;
					margin: 0 10px;
					width: 45%;
				}
				.footer_right{
					height: 100%;
					margin-right: 10px;
					width: 55%;
				}
			
		}
	}
	.slot{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>