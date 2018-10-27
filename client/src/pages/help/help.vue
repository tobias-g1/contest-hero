<template>
    <el-main>
        <el-row :gutter="20">
            <el-col :span="24">
                <h1 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt="">Frequently Asked Questions</h1>
                <p>The questions and answers below answer some common questions about Contest Hero.</p>

                <!-- General -->

                <h3 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> General </h3>
                <el-collapse v-model="general" accordion>
                    <el-collapse-item title="What is Contest Hero?" name="1">
                        <div>Contest Hero allows you to easily create, manage, find and enter contests on the Steem blockchain. By providing a dedicated set of tools for contests creators and contestants, Contest Hero hopes to provide value through increased engagament and increased reward for value creation.</div>
                    </el-collapse-item>
                    <el-collapse-item title="Why was Contest Hero created?" name="2">
                        <div>Currently we see a large number of different contests on the Steem Blockchain, however there is no real tools to help you do this. Whether that's organising entries, selecting winners or helping provide visibility to smaller contests. That's where Contest Hero comes in...</div>
                    </el-collapse-item>
                    <el-collapse-item title="Do you take beneficaries?" name="3">
                        <div>In order to help aid the growth of the platform a small beneficiary of 10% is applied to all contests and entries made on the platform.</div>
                    </el-collapse-item>
                    <el-collapse-item title="Is Contest Hero open source?" name="4">
                        <div>Yes, Contest Hero is open source and welcomes community contributors. You can find us on GitHub <a target="_blank" href="https://github.com/tobias-g1/contest-hero">here</a> </div>
                    </el-collapse-item>
                    <el-collapse-item title="How can I contact Contest Hero?" name="5">
                        <div>The best way to contact Contest Hero is via Discord. You can join our discord server by clicking <a target="_blank" href="https://discord.gg/ZscukvW">here</a> </div>
                    </el-collapse-item>
                    <el-collapse-item title="Is Contest Hero still in development?" name="6">
                        <div>Yes, Contest Hero is currently in beta. You will see regular updates to the platform in the coming months.</div>
                    </el-collapse-item>
                </el-collapse>

                <!-- Creating Contests -->

                <h3 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Creating Contests </h3>
                <el-collapse v-model="creatingContests" accordion>
                    <el-collapse-item title="How can I create a contest?" name="1">
                        <div>Creating a contest is easy, to create a contest all you need to do is click the + icon shown at the top of the page. Once selected you will be taken to the create contest page where you can get your contest underway.</div>
                    </el-collapse-item>
                    <el-collapse-item title="Why are there different categories?" name="2">
                        <div>Contest Hero sorts contest into key areas to help make your contests easier to find.</div>
                    </el-collapse-item>
                    <el-collapse-item title="What does entry method mean?" name="3">
                        <div>Every entry made on Contest Hero results in a new post or comment being made on the Steem blockchain, some contests don't require a full posts to be made therefore you have the ability to select whether you would like your contest
                            entries to be made as a comment or a post. You can edit your contest entry method at any time and your current entries will not be lost.</div>
                    </el-collapse-item>
                    <el-collapse-item title="How can I select who won my contest?" name="4">
                        <div>You can select the winners of your contest at any time, you can do this using the select winner option shown in the vertical dot menu above your contest. </div>
                    </el-collapse-item>
                </el-collapse>

                <!-- Entering Contests -->

                <h3 class="header"> <img class="small-circle" src="@/assets/gradient-circle.png" alt=""> Entering Contests </h3>
                <el-collapse v-model="enteringContsts" accordion>
                    <el-collapse-item title="How do I enter a contest?" name="1">
                        <div>All contests can be entered directly from the view contest page, underneath each contest post there is a button that allows you to enter the contest. On the enter contest button you will be able to see if your entry will be made via
                            a comment or a post. The entry button will be disabled when the contest deadline is met</div>
                    </el-collapse-item>
                    <el-collapse-item title="Can I enter a contest outside of Contest Hero?" name="2">
                        <div>Currently, only entries made via Contest Hero will be added to as entries for a contest, some features that Contest Hero provide require additional information not found on the Steem blockchain.</div>
                    </el-collapse-item>
                    <el-collapse-item title="Can I enter a contest using a comment?" name="3">
                        <div>Yes, if the contest creator selects that the contest entry method is via a comment.</div>
                    </el-collapse-item>
                </el-collapse>
                 <p><sub><i>Last updated on 27th October 2018.</i></sub></p>           
                 </el-col>
        </el-row>
    </el-main>
</template>

<script>
export default {
  data () {
    return {
      general: '1',
      creatingContests: '1',
      enteringContests: '1'
    }
  }
}
</script>

<style src='@/pages/help/help.css'>
