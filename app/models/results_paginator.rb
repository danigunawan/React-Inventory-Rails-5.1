class ResultsPaginator
  def initialize(results, current_page=1, per_page=9)
    set_results(results)
    set_total_entries
    set_per_page(per_page)
    set_current_page(current_page)
  end

  def displayed_page_count
    paginated_results.total_pages
  end

  def get_current_page
    @current_page
  end

  def items
    paginated_results.to_json
  end

  def paginated_results
    @results.paginate(page: @current_page, per_page: @per_page)
  end

  def set_current_page(current_page)
    @current_page = current_page.to_i
  end

  def set_per_page(per_page)
    @per_page = per_page.to_i
  end

  def set_results(results)
    @results = results
  end

  def set_total_entries
    @results.count
  end

end
