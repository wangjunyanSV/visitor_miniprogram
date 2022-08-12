<template>
	<view>

		<div>
			<div class="add_box" v-on:click="addHouse">
				<span style="color: #0483d7;vertical-align: middle">添加房屋</span>
				<div style="height: 20px;width: 20px;display: inline-block;margin: auto">
					<img style="height: 20px;width: 20px;vertical-align: middle" src="../../assets/add.svg" alt="" />
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>

		<radio-group @change="radioChange">
			<label v-for="(item, index) in houses" :key="item.value" style="display: flex;margin: 10px 20px;">
				<view style="flex: 1;">{{item.communityName}}{{item.name}}</view>
				<view>
					<radio :value="item.value" :checked="currentHouseId === item.value" />
				</view>
			</label>
		</radio-group>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				houses: [],
				currentHouseId: ''
			}
		},
		methods: {
			radioChange(res) {
				console.log(res);
				console.log(res.detail.value);
				this.houses.forEach(house => {
					console.log(house);
					if (res.detail.value === house.value) {
						uni.setStorage({
							key: this.$config.houseId,
							data: house.value
						})
						uni.setStorage({
							key: this.$config.houseName,
							data: house.name
						})
						uni.setStorage({
							key: this.$config.communityId,
							data: house.communityId
						})
						uni.setStorage({
							key: this.$config.communityName,
							data: house.communityName,
              success(){
                uni.$emit('changeHouse',{msg:'房屋切换'})
                uni.navigateBack({

                })
              }
						})

					}
				})



			},
			addHouse() {
				uni.navigateTo({
					url: '../ownerAuth/ownerAuth'
				})

			}

		},
		created() {

			this.currentHouseId = uni.getStorageSync(this.$config.houseId)
			console.log(this.currentHouseId);
			uni.getStorageSync(this.$config.houses).forEach(e => {
				this.houses.push({
					value: e.houseId,
					name: e.houseName,
					communityId: e.communityId,
					communityName: e.communityName,
				})
			})



		}
	}
</script>

<style>
	.add_box {
		margin: 20px;
		overflow: hidden;
		float: right;
	}
</style>
