<div id="pc_200_footer_nav">
    <div class="pc_200_footer_navi">
        <div class="footer_navi_lt clearfix" style="float: none ;">
            <ul>
<!--                <li><a onclick="ga('send', 'event', '首页', '按钮-关于早道');" href="http://www.izaodao.com/Index/About#about" target="_blank">关于早道</a></li>-->
<!--                <li>丨</li>-->
<!--                <li><a onclick="ga('send', 'event', '首页', '按钮-使用协议');" href="http://www.izaodao.com/questions.php?mod=rule" target="_blank">使用协议</a></li>-->
<!--                <li>丨</li>-->
<!--                <li><a onclick="ga('send', 'event', '首页', '按钮-合作平台');" href="http://www.izaodao.com/Index/About#about" target="_blank">合作平台</a></li>-->
<!--                <li>丨</li>-->
<!--                <li><a onclick="ga('send', 'event', '首页', '按钮-媒体报道');" href="http://www.izaodao.com/Index/About#reports" target="_blank">媒体报道</a></li>-->
<!--                <li>丨</li>-->
<!--                <li><a onclick="ga('send', 'event', '首页', '按钮-加入我们');" href="http://www.izaodao.com/Index/About#join" target="_blank">加入我们</a></li>-->
<!--                <li>丨</li>-->
<!--                <li><a onclick="ga('send', 'event', '首页', '按钮-联系我们');" href="http://www.izaodao.com/Index/About#contact" target="_blank">联系我们</a></li>-->
<!--                <li>丨</li>-->
                <?php foreach ($meta['components'] as $link):?>
                    <li><a href="<?php echo $link['href'];?>" target="_blank"><?php echo $link['title'];?></a></li>
                    <li>丨</li>
                <?php endforeach;?>
            </ul>
        </div>
        <p>© Copyright 2012-2016 早道（大连）教育科技有限公司 版权所有 izaodao.com 辽ICP备13009594号</p>
    </div>
</div>