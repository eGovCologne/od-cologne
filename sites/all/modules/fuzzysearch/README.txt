Fuzzysearch
-----------
Project page: http://drupal.org/project/fuzzysearch

=== Installation ===

To install this module simply:
-  Install search_api, entity and fuzzysearch as usual,
   see http://drupal.org/node/70151 for further information.
-  A default search api server and index will be created.
-  You will need to install search_api_page or views to create the search form
   and results page.
-  Access permissions for searching are controlled by search_api_page and views.
   Be sure only to index public content.
-  Run cron until your site is 100% indexed.
-  Consider using a the search api stopwords processor and a stopwords file to
   keep common words from bloating your index.
-  Set up a regular cron job to keep your site fully indexed.

=== Un-installation ===

To uninstall completely and remove all traces of the module from your database,
you must first delete any search pages and indexes. Then uninstall the module
normally. Any servers using fuzzysearch will be deleted automatically.

=== What is indexed? ===

Using the search api index fields form, you can set any field to be indexed.
However only fulltext fields will be processed for fuzzy searching. The body
field is an example of a fulltext field. You may wish to enable complete entity
view data alteration. This will cause anything that appears on the public page
for the entity (reading a node for example) to be indexed and fuzzy searchable.

=== Fuzzysearch Processor Settings ===

The fuzzysearch processors must be enable and run last in the search_api
processor configuration for fuzzysearch to work.

--Search Settings--

You can choose the ngram length. This is the size of the chunks words are
broken into on indexing and searching. The default value is 3. The lower the
value, the more results (and more noise) you will get. Also, a lower value will
increase the size of the database tables.

--Assume missing letters in search terms:
A search term as entered by a user may be missing letters. If you want to search
for longer words than the user has entered, you can increase this number. In
English for example, you will need at least 1 if you want to return a plural
search term ending with "s" from a singular word. 0 means the term will not
return longer words in the results. 1 means a 4 letter search term will also
check 5 letters words in the index.

--Assume extra letters in search terms:
A search term as entered by a user may have extra letters. If you want to search
for shorter words than the user has entered, you can increase this number. In
English for example, you will need at least 1 if you want to return a singular
word from a plural search term ending with "s". 0 means the term will not
return shorter words in the results. 1 means a 5 letter search term will also
check 4 letters words in the index.

--Minimum completeness:
When indexed, each ngram is saved with the percentage of the word it belongs to.
"app" is 33.33% of "apple" because it is one ngram out of three (app, ppl, ple).
When searching, Fuzzy search lets you specify a minimum sum of percentages of
the ngrams it finds in each node. A lower number lets in more noise. Enter a
value between 0 and 100 to set the completeness required in the returned results.

It is best to set this value 10 points below your ideal minimum percentage. So
if you wanted to match results with at least 50% of the word matching, set this
value to 40.  The match is calculated per indexed word and not by the search
phrase, ensuring that matches are relevant to the words in the phrase and not
just all the letter combinations in the phrase.

Also note that when a phrase matches more than a single word the completeness
can be higher than 100%, this is because the completeness of each word is summed
and then sorted as a measure of accuracy in the result set.

--Sort by score
If selected, the results will be sorted by score first and completeness second,
which can make tag scores even more important. The default is to sort by
completeness first. You may want to try this if you find high scoring nodes
being pushed down in the results below lower scoring nodes with higher
completeness.

--Excerpt settings--

--Display scoring
Checking the "Display scoring" checkbox is helpful for debugging when you are
trying to fine tune score modifiers.  It will output completeness and score
values under each of the returned results. It will also show you the regex used
for fuzzy highlighting.

--Result excerpt length:
Set the length of the displayed text excerpt surrounding a found search term.
Applies per found term.

--Maximum result length:
Set the maximum length of the displayed result. Set to 0 for unlimited length.
Applies per result.

--Minimum spelling score:
Fuzzysearch tries to highlight search terms that may be misspelled. You can set
the minimum threshold, which is calculated as a ratio of ngram hits to misses in
a term. 0 may cause a misspelling to highlight everything, and 100 will only
highlight exact terms. Enter a value between 0 and 100.

This works by replacing bad ngrams (misspelled, missing letters, extra letters)
with a wildcard. It is possible to get false matches. For example, searching for
"rendition" will also highlight "condition" if your spelling score is low
enough. However, these kinds of matches are likely to have lower score
completeness and be sorted to the bottom of your results if your search term
exists in your content.


=== Integration with Views ===

Using views with Fuzzysearch can make your searches more powerful and accurate,
and allows the user to control various filters provided by Views, if you wish.

Enable the Search API Views module. Create a new view and choose the fuzzysearch
index you wish to search in the "Show" dropdown list. Select other options as
you like, create and continue to edit the view.

Under fields select any fields you wish to display. Indexed Node: Title and
Search: Excerpt are two good fields to start with.

Under Filter criteria add a filter for Search: Fulltext search, select the
fields in your index that you wish to search, and expose the filter.

Under Sort criteria add a sort for Search: Relevance and set to sort descending.

Add whichever Views display format you need, and save the view.


=== About Fuzzy Search ===

This module provides a fuzzy matching search engine for entities using the
search_api module. Entities are indexed when the site's cron job is run.  See
the index settings for options.

Fuzzy matching is implemented by using ngrams.  Each word is split
into 3 (default) letter lengths, so 'apple' gets indexed with 3 smaller strings
'app', 'ppl', 'ple'.  The effect of this is that as long as your search matches
X percentage (administerable in the admin settings) of the word the entity will
be pulled up in the results.