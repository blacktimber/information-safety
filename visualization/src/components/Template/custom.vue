<template>
	<div class="show_body">
		<div class="body_header">
			<div class="header_left slot">
				<slot name="1"></slot>
			</div>
			<div class="header_right slot">
				<slot name="2"></slot>
			</div>
		</div>
		<div class="body_footer">
			<div class="footer_left slot">
				<slot name="3"></slot>
			</div>
			<div class="footer_right slot">
				<slot name="4"></slot>
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
		padding: 10px 0;
		div{
			div{
				border: 1px solid #ccc;
			}
		}
		.body_header{
			display: flex;
			width: 100%;
			height: 50%;
			 .header_left{
			 	margin: 0 10px;
				width: 60%;
				height: 100%;
			 }
			.header_right{
				margin-right: 10px;
				width: 40%;
				height: 100%;
			}
		}
		.body_footer{
			display: flex;
			width: 100%;
			margin-top: 10px;
			height: 50%;
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