jQuery.fn.highlight = function(pat) {
    function innerHighlight(node, pat) {
        var skip = 0;
        if (node.nodeType == 3) {
            var pos = node.data.toUpperCase().indexOf(pat);
            if (pos >= 0) {
                var spannode = document.createElement("span");
                spannode.className = "highlight";
                var middlebit = node.splitText(pos);
                var endbit = middlebit.splitText(pat.length);
                var middleclone = middlebit.cloneNode(true);
                spannode.appendChild(middleclone);
                middlebit.parentNode.replaceChild(spannode, middlebit);
                skip = 1;
            }
        } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
            for (var i = 0; i < node.childNodes.length; ++i) {
                i += innerHighlight(node.childNodes[i], pat);
            }
        }
        return skip;
    }
    return this.each(function() {
        innerHighlight(this, pat.toUpperCase());
    });
};
jQuery.fn.removeHighlight = function() {
    function newNormalize(node) {
        for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
            var child = children[i];
            if (child.nodeType == 1) {
                newNormalize(child);
                continue;
            }
            if (child.nodeType != 3) {
                continue;
            }
            var next = child.nextSibling;
            if (next == null || next.nodeType != 3) {
                continue;
            }
            var combined_text = child.nodeValue + next.nodeValue;
            var new_node = node.ownerDocument.createTextNode(combined_text);
            node.insertBefore(new_node, child);
            node.removeChild(child);
            node.removeChild(next);
            i--;
            nodeCount--;
        }
    }
    return this.find("span.highlight").each(function() {
        var thisParent = this.parentNode;
        thisParent.replaceChild(this.firstChild, this);
        newNormalize(thisParent);
    }).end();
};
$("#custom-search").keyup(function(e) {
    var url = window.location.pathname;
    var search = $(this).val();
    if (search.length > 1) {
        $("#msg-status").html("Searching...");
        $.ajax({
            type: "GET",
            url: base_url + "/custom-search?random=" + Date.now(),
            data: {
                search: search,
                wahurl: url.split('/')[2]
            },
            success: function(responseData) {
                $("#msg-status").html("");
                if (responseData.html == "") {
                    $("#msg-status").html("No Record Found for <strong>" + search + "</strong>");
                    $("#suggestionList").html("");
                    $("#suggestionList").addClass("display-none");
                    return;
                } else {
                    $("#suggestionList").removeClass("display-none");
                    $("#suggestionList").html(responseData.html);
                    var searchTerm = search;
                    $("#suggestionList").removeHighlight();
                    if (searchTerm) {
                        $("#suggestionList").highlight(searchTerm);
                    }
                }
            },
            error: function(err) {
                $("#suggestionList").addClass("display-none");
                $("#msg-status").html("No record found!");
            },
        });
    } else {
        $("#suggestionList").addClass("display-none");
        $("#suggestionList").html("");
    }
});