<template>
	<div class="show_body">
		<div class="body_header">
			<div class="header_left slot">
				<slot name="1"></slot>
			</div>
			<div class="header_main slot">
				<slot name="2"></slot>
			</div>
			<div class="header_right">
				<div class="right_top slot">
					<slot name="3"></slot>
				</div>
				<div class="right_boom slot">
					<slot name="4"></slot>
				</div>
			</div>
		</div>
		<div class="body_footer">
			<div class="footer_left slot">
				<slot name="5"></slot>
			</div>
			<div class="footer_right slot">
				<slot name="6"></slot>
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
		.body_header{
			display: flex;
			width: 100%;
			height: 64%;
			 .header_left{
			 	margin: 0 10px;
				width:32%;
				border: 1px solid #ccc;
			 }
			 .header_main{
				 margin-right: 10px;
				 width:32%;
				 border: 1px solid #ccc;
			 }
			.header_right{
				margin-right: 10px;
				width:32%;
				display: flex;
				flex-direction:column;
				.right_top{
					height: 50%;
					border: 1px solid #ccc;
				}
				.right_boom{
					margin-top: 10px;
					height: 50%;
					border: 1px solid #ccc;
				}
			}
		}
		.body_footer{
			display: flex;
			width: 100%;
			margin-top: 10px;
			height: 32%;
			 .footer_left {
					height: 100%;
					margin: 0 10px;
					width: 50%;
					border: 1px solid #ccc;
				}
				.footer_right{
					height: 100%;
					margin-right: 10px;
					width: 50%;
					border: 1px solid #ccc;
				}
			
		}
	}
	.slot{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>