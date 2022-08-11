<template>
	<view>
		<uni-search-bar class="uni-mt-10" radius="100" placeholder="搜索社区名称" clearButton="none" cancelButton="none"
			@confirm="search" />

		<view v-for="(item,index) in results" :key="index" v-on:click="checkItem(index)"
			style="line-height: 20px;padding: 10px;border-bottom: 1px solid ghostwhite; ">
			{{item['communityObj']['name']}}


		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				results: []

			}
		},
		methods: {
			search(res) {
				this.$apis.findCommunity({
					'name': res.value,
				}).then(res => {
					this.results = res['communityList']
					console.log(res);

				})
				// console.log(res.value);
			},
			checkItem(index) {

				const eventChannel = this.getOpenerEventChannel();
				eventChannel.emit('checkCommunity', {
					data: {
						"communityId": this.results[index]['communityObj']['id'],
						"communityName": this.results[index]['communityObj']['name'],
					}
				});

				uni.navigateBack({

				})
				console.log(index);
			}

		}
	}
</script>

<style>

</style>
