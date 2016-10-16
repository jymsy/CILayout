<div class="menu_v422">
    <ul>
<!--        <li>-->
<!--            <span class="book_active"></span>-->
<!--        </li>-->
<!--        <li>-->
<!--            <span class="tadk"></span>-->
<!--            <i class="has_v422"><img src="images/has_v422.png" alt=""/></i>-->
<!--        </li>-->
<!--        <li>-->
<!--            <span class="file"></span>-->
<!--        </li>-->
<!--        <li>-->
<!--            <span class="pipe"></span>-->
<!--        </li>-->
<!--        <li class="borderBottom00">-->
<!--            <span class="info"></span>-->
<!--        </li>-->
        <?php
            foreach ($meta['components'] as $li):?>
            <li <?php if (isset($li['class'])) echo "class=\"{$li['class']}\"";?>>
                <span class="<?=$li['span_class']?>"></span>
            </li>
        <?php endforeach;?>
    </ul>
</div>