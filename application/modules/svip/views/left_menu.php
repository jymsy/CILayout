<div class="menu_v422">
    <ul>
        <?php
            foreach ($meta['components'] as $li):?>
            <li <?php if (isset($li['class'])) echo "class=\"{$li['class']}\"";?>>
                <span class="<?=$li['span_class']?>"></span>
            </li>
        <?php endforeach;?>
    </ul>
</div>