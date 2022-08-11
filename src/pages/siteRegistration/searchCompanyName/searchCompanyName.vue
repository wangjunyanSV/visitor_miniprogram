<template>
	<view>
		<uni-search-bar class="uni-mt-10" radius="5" placeholder="自动显示隐藏" clearButton="auto" cancelButton="none"
			@confirm="search" @input="change" />


		<view v-for="(item,index) in resData" :key="index" v-on:click="checkItem(index)"
			style="line-height: 20px;padding: 10px;border-bottom: 1px solid ghostwhite; ">
			{{item['name']}}
		</view>

		<!-- <view style="height: 100px;width: 100px;background-color: aqua;" v-on:click="send"></view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				resData: []

			}
		},
		methods: {
			search(res) {
				this.$apis.getCompany({
					'name': res.value
				}).then(res => {
					this.resData = res['proprietorList']

				})

			},
			change(res) {
				console.log(res);
			},
			checkItem(index) {
				console.log(index);

				const eventChannel = this.getOpenerEventChannel();

				eventChannel.emit('selectCompany', {
					data: {
						"selectCompanyName": this.resData[index]['name'],
						"selectCompanyId": this.resData[index]['id'],
						"propertyId": this.resData[index]['propertyId'],
					}
				});
				uni.navigateBack({

				})
			}

		}
	}
</script>

<style>
	.uni-mt-10 {
		margin-top: 10px;
	}
</style>
