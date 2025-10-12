window.onload = function() {
    const logo = document.querySelector('.logoIcon');
    const container = document.querySelector('.container');
    const spans = document.querySelectorAll('div span');
    const icons = document.querySelectorAll('div svg');

    let isExpanded = false;



    logo.onmouseover = function() {
        logo.style.color = 'red';
        logo.style.transform = 'scale(1.5)';
        logo.style.transition = 'all 0.3s';
    };
    
    logo.onmouseout = function() {
        logo.style.color = '';
        logo.style.transform = 'scale(1)';
    };

    
    logo.onclick = function () {
        
        if (isExpanded) {
            container.style.maxWidth = '13%';
            spans.forEach(span => {
                span.style.display = 'none';
            });
            isExpanded = false;
        } else {
            container.style.maxWidth = '25%';
            container.style.transition = 'all 0.3s ease';
            spans.forEach(span => {
                span.style.display = 'inline';
                span.style.marginLeft = '10px';
                span.style.transition = 'all 0.3s ease';
            });
            isExpanded = true;
        }
    };


    spans.forEach(span => {
        span.onmouseover = function() {
            span.style.color = 'red';
            span.style.transition = 'all 0.3s';
            span.style.transform = 'scale(1.5)';
            span.style.cursor = 'pointer';
        };
    });

    spans.forEach(span => {
        span.onmouseout = function() {
            span.style.color = '';
            span.style.transition = 'all 0.3s';
            span.style.transform = 'scale(1)';
        };
    });

    icons.forEach(icon => {
        icon.onmouseover = function() {
            icon.style.color = 'red';
            icon.style.transition = 'all 0.3s';
            icon.style.transform = 'scale(1.5)';
            icon.style.cursor = 'pointer';
        }
        icon.onmouseout = function() {
            icon.style.color = '';
            icon.style.transition = 'all 0.3s';
            icon.style.transform = 'scale(1)';
            icon.style.cursor = 'pointer';
        }
    });
};